package models

import "github.com/gorilla/websocket"

type SocketConnection struct {
	Username string
	Connector *websocket.Conn
}



type SocketMessage struct {
	Event 	string 			`json:"event"`
	Data 	FromClientData  `json:"data"`
}


type FromClientData struct {
	To 				string 	`json:"to"`
	PlainMessage 	string 	`json:"plain_message"`
	Date 			int 	`json:"date"`
	MessageType 	int 	`json:"messageType"`
	Salt			float64 `json:"salt"`
}





//		to: userId,
//		plain_message: text,
//      date: new Date().getTime(),
//      messageType: MessageType.PlainMessage,
//      salt: Math.random()