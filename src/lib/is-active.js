const isActive = (router, destination) => {
  return router.isActive(destination, true);
};

export default isActive;
