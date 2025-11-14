// utils/itemAvailability.ts

import { BorrowableItemsModel, BorrowRequestModel } from "@/models/borrow.items";

interface AvailabilityCheck {
  itemId: string;
  startDate: Date;
  endDate: Date;
  excludeRequestId?: string; // For editing existing requests
}

/**
 * Calculate how many units are available for a given date range
 * Only counts approved and picked_up requests as "reserved"
 */
export const getAvailableQuantity = async ({
  itemId,
  startDate,
  endDate,
  excludeRequestId,
}: AvailabilityCheck): Promise<number> => {
  try {
    // Get the item's total quantity
    const item = await BorrowableItemsModel.findById(itemId);
    if (!item) {
      throw new Error('Item not found');
    }

    // Find all approved/picked_up requests that overlap with the date range
    const query: any = {
      main_item: itemId,
      status: { $in: ['approved', 'picked_up'] }, // ✅ Only count these statuses
      // Date overlap logic: requests overlap if they don't end before startDate 
      // and don't start after endDate
      borrowDate: { $lte: endDate },
      returnDate: { $gte: startDate },
    };

    // Exclude specific request (used when approving to not count itself)
    if (excludeRequestId) {
      query._id = { $ne: excludeRequestId };
    }

    const overlappingRequests = await BorrowRequestModel.find(query);

    // Sum up all reserved quantities during this period
    const reservedQuantity = overlappingRequests.reduce(
      (sum, req) => sum + req.quantity,
      0
    );

    const available = item.total - reservedQuantity;

    return Math.max(0, available); // Never return negative
  } catch (error) {
    console.error('Error checking availability:', error);
    throw error;
  }
};

/**
 * Get detailed availability info for display
 */
export const getItemAvailabilityInfo = async (
  itemId: string, 
  startDate: Date, 
  endDate: Date
) => {
  const item = await BorrowableItemsModel.findById(itemId);
  if (!item) throw new Error('Item not found');

  const available = await getAvailableQuantity({ itemId, startDate, endDate });
  
  return {
    total: item.total,
    available,
    reserved: item.total - available,
    itemName: item.category,
  };
};

/**
 * Get conflicting requests for a date range (for admin view)
 */
export const getConflictingRequests = async (
  itemId: string,
  startDate: Date,
  endDate: Date
) => {
  return await BorrowRequestModel.find({
    main_item: itemId,
    status: { $in: ['approved', 'picked_up'] },
    borrowDate: { $lte: endDate },
    returnDate: { $gte: startDate },
  }).populate('user', 'first_name last_name email');
};