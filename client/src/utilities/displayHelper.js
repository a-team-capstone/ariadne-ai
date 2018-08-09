const displayHelper = (_, eventEmitter) => {
  function onResize() {
    eventEmitter.emit('resize', {
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }
  window.addEventListener('resize', _.debounce(onResize, 200));

  return {
    subscribeResize: onResize => {
      eventEmitter.addListener('resize', onResize);
    },
    unsubscribeResize: onResize => {
      eventEmitter.removeListener('resize', onResize);
    },
    getDimensions: () => {
      return {
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
  };
};

export default displayHelper;
