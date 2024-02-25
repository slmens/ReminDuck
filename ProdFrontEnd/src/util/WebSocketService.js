import Stomp from "stompjs";
import SockJS from "sockjs-client";

const WebSocketService = {
  stompClient: null,

  initializeWebSocket: (
    handleReceivedNotification,
    isConnected,
    isNotified
  ) => {
    let formattedUserId = null;
    const userId = localStorage.getItem("id");
    formattedUserId = userId.replace(/^"(.*)"$/, "$1");
    if (
      formattedUserId &&
      formattedUserId !== "null" &&
      formattedUserId !== null &&
      formattedUserId !== ""
    ) {
      if (!isConnected.current) {
        const socket = new SockJS(
          "http://localhost:8080/notificationWebSocketRoom"
        );
        WebSocketService.stompClient = Stomp.over(socket);

        WebSocketService.stompClient.connect({}, function (frame) {
          if (frame && frame.command === "CONNECTED") {
            isConnected.current = true;

            if (formattedUserId) {
              WebSocketService.stompClient.subscribe(
                `/user/${formattedUserId}/queue/privateNotifications`,
                function (message) {
                  isNotified.current = false;
                  handleReceivedNotification(JSON.parse(message.body));
                }
              );
            }

            WebSocketService.stompClient.subscribe(
              `/topic/globalNotifications`,
              function (message) {
                handleReceivedNotification(JSON.parse(message.body));
              }
            );
          }
        });
      } else {
        console.log("Already connected");
      }
    }
  },

  closeWebSocket: () => {
    if (
      WebSocketService.stompClient &&
      WebSocketService.isConnected &&
      WebSocketService.stompClient.connected
    ) {
      // Check if the connection is established before disconnecting
      WebSocketService.stompClient.disconnect();
      WebSocketService.isConnected = false; // Set isConnected to false when the connection is closed
    }
  },
};

export default WebSocketService;
