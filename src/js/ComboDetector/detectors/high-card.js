onmessage = ({ data }) => {
    postMessage({ isWinner: true, winningCards: [ 1, 2, 3 ], data });
};