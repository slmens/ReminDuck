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
    if (userId != null) {
      formattedUserId = userId.replace(/^"(.*)"$/, "$1");
      WebSocketService.closeWebSocket();
      const socket = new SockJS(
        "http://localhost:8080/notificationWebSocketRoom"
      );
      WebSocketService.stompClient = Stomp.over(socket);

      WebSocketService.stompClient.connect({}, function () {
        console.log("WebSocket connected");
        console.log("WebSocket state: ", socket.readyState); // Add this
        isConnected.current = true;

        if (formattedUserId) {
          // Check if formattedUserId is not null
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
      });
      // Rest of your code that uses formattedUserId
    } else {
      // Handle the case when userId is null
      console.error("User ID is null. Handle this case accordingly.");
      return;
    }
  },

  closeWebSocket: () => {
    console.log(WebSocketService.stompClient, WebSocketService.isConnected);
    if (WebSocketService.stompClient && WebSocketService.isConnected) {
      // Check if the connection is established before disconnecting
      WebSocketService.stompClient.disconnect();
      WebSocketService.isConnected = false; // Set isConnected to false when the connection is closed
    }
  },
};

export default WebSocketService;
