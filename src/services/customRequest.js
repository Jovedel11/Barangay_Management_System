const customRequest = async ({ path, attributes }) => {
  try {
    const result = await fetch(path, attributes);
    const response = await result.json();
    if (!result.ok) return { success: false };
    return { success: true, response };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export default customRequest;

//"/api/resident/booking-item"
//"/api/resident/brgy-docs"
