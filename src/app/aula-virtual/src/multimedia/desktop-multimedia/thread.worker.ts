
declare function postMessage(message: any): void;

addEventListener('message', ({ data }) => {
  setTimeout(() => {
  }, 100);
  postMessage(true);
});

