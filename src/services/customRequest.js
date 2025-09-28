const customRequest = async ({ path, data }) => {
  try {
    const result = await fetch(path, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (!result.ok) return { success: false };
    return { success: true };
  } catch (error) {
    console.log(error);
    return { success: false };
  }
};

export default customRequest;

//"/api/resident/booking-item"
//"/api/resident/brgy-docs"
