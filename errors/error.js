module.exports = {
  errorMSg: error => {
    console.log("error :", error);
    return {
      status: "error",
      message: error
    };
  }
};
