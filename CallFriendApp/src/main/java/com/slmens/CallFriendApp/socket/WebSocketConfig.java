package com.slmens.CallFriendApp.socket;

import jakarta.validation.constraints.NotNull;
import lombok.NonNull;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.config.annotation.EnableWebSocketMessageBroker;
import org.springframework.web.socket.config.annotation.StompEndpointRegistry;
import org.springframework.web.socket.config.annotation.WebSocketMessageBrokerConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketTransportRegistration;
import org.springframework.web.socket.handler.WebSocketHandlerDecorator;
import org.springframework.web.socket.handler.WebSocketHandlerDecoratorFactory;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(final MessageBrokerRegistry registry) {
        registry.enableSimpleBroker("/topic"); // this is for sending
        registry.setApplicationDestinationPrefixes("/ws"); // this is for getting, root
    }

    @Override
    public void registerStompEndpoints(final StompEndpointRegistry registry) {
        registry.addEndpoint("/notificationWebSocket")// was "our-websocket"
                .setAllowedOrigins("http://localhost:5173/")
                .withSockJS();
    }

    @Override
    public void configureWebSocketTransport(WebSocketTransportRegistration registration) {
        registration.addDecoratorFactory(webSocketHandlerDecoratorFactory());
    }

    @Bean
    public WebSocketHandlerDecoratorFactory webSocketHandlerDecoratorFactory() {
        return new WebSocketHandlerDecoratorFactory() {
            @Override
            @NonNull
            public WebSocketHandler decorate(@NonNull final WebSocketHandler handler) {
                return new WebSocketHandlerDecorator(handler) {
                    @Override
                    public void afterConnectionEstablished(@NonNull WebSocketSession session) throws Exception {
                        SecurityContext securityContext = SecurityContextHolder.getContext();
                        Authentication authentication = securityContext.getAuthentication();

                        // Debug logs
                        System.out.println("Authentication: " + authentication);

                        // Handle authentication details as needed
                        if (authentication != null && authentication.isAuthenticated()) {
                            super.afterConnectionEstablished(session);
                        } else {
                            super.afterConnectionEstablished(session);
                            System.out.println("Authentication failed");
                        }
                    }
                };
            }
        };
    }
}