import {DataStore} from "@aws-amplify/datastore";
import {Message} from "../../models";

export async function sendMessage(chatroomID, sender, message) {
    const currentDate = new Date();
    const formattedTimestamp = currentDate.toISOString();
    
    const newMessage = await DataStore.save(
      new Message({
        "ChatRoomID": chatroomID,
        "Content": message,
        "Sender": sender.id,
        "Time": formattedTimestamp,
      })
    );

    return newMessage
  }