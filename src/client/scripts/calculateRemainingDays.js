const calculateRemainingDays = (departureDate) => {
    const today = new Date();
    const targetDate = new Date(departureDate);
    const timeDifference = targetDate.getTime() - today.getTime();
    return Math.ceil(timeDifference / (1000 * 3600 * 24));
  };
  
  export { calculateRemainingDays };
  