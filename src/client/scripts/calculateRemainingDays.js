const calculateRemainingDays = (departureDate) => {
    const today = new Date();
    const targetDate = new Date(departureDate);
    const timeDiffere = targetDate.getTime() - today.getTime();
    return Math.ceil(timeDiffere / (1000 * 3600 * 24));
  };
  
  export { calculateRemainingDays };
  