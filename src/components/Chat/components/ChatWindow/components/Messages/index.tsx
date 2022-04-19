import * as dayjs from 'dayjs';
// import { AnimatePresence } from 'framer-motion';
import { FC, useEffect, useRef } from 'react';
import { Message } from 'types/chat';

import MessageItem from './components/MessageItem';

export const relativeDate = (date: dayjs.Dayjs) => {
  const today = dayjs.default(new Date()).startOf('day');
  const yesterday = today.subtract(1, 'day');
  const oneWeekAgo = today.subtract(1, 'week');

  if (date.isAfter(today)) {
    return 'Today';
  }

  if (date.isAfter(yesterday)) {
    return 'Yesterday';
  }

  if (date.isAfter(oneWeekAgo)) {
    return date.format('dddd');
  }

  return date.format('DD-MM-YYYY');
};

type Props = {
  userUid: string;
  messages: Message[];
};

const Messages: FC<Props> = ({ messages, userUid }) => {
  let currentDate: dayjs.Dayjs | undefined;

  const ref = useRef<HTMLDivElement>(null);

  if (messages.length) {
    currentDate = dayjs.default(messages[0].createdAt);
  }

  useEffect(() => {
    const domNode = ref.current;

    if (domNode) {
      domNode.scrollTop = domNode.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={ref}
      className='chat-messages flex flex-1 flex-col items-start overflow-y-auto bg-[#e5ddd5] p-2 px-6'
    >
      {!!messages.length && (
        <div className='mx-auto my-0 mb-3 rounded-lg bg-[#E1F3FB] py-1 px-2 text-primary shadow-md'>
          {relativeDate(currentDate as dayjs.Dayjs)}
        </div>
      )}
      {/* <AnimatePresence> */}
      {!!messages.length &&
        messages.map((message) => {
          const startOfDay = dayjs.default(message.createdAt).startOf('day');
          const date = dayjs.default(message.createdAt);

          if (startOfDay.isAfter(currentDate)) {
            currentDate = startOfDay;

            return (
              <>
                <div className='mx-auto my-0 mb-3 rounded-lg bg-[#E1F3FB] py-1 px-2 text-primary shadow-md'>
                  {relativeDate(date as dayjs.Dayjs)}
                </div>
                <MessageItem
                  key={message.id}
                  {...message}
                  out={message.sender === userUid}
                />
              </>
            );
          }

          return (
            <MessageItem
              key={message.id}
              {...message}
              out={message.sender === userUid}
            />
          );
        })}
      {/* </AnimatePresence> */}
    </div>
  );
};

export default Messages;

// componentDidMount() {
//   const { selectedContact, currentUser } = this.props;

//   if (selectedContact && !selectedContact.chat) {
//     // firestore.collection('chats').add({
//     //   members: [selectedContact.uid, currentUser.uid],
//     //   messages: [],
//     // });
//   }

//   this.scrollToBottom();
// }

// componentDidUpdate() {
//   if (this.chatMessagesRef.current) {
//     this.scrollToBottom();
//   }
// }

// scrollToBottom = () => {
//   if (this.chatMessagesRef.current) {
//     this.chatMessagesRef.current.scrollTop =
//       this.chatMessagesRef.current.scrollHeight -
//       this.chatMessagesRef.current.clientHeight;
//   }
// };

// sendMessageHandler = (message) => {
//   const { selectedContact, currentUser } = this.props;

//   // firestore
//   //   .collection('chats')
//   //   .doc(selectedContact.chat.id)
//   //   .update({
//   //     messages: _firebase.firestore.FieldValue.arrayUnion({
//   //       sender: currentUser.uid,
//   //       receiver: selectedContact.uid,
//   //       message,
//   //       timestamp: new Date(),
//   //     }),
//   //   });

//   this.scrollToBottom();
// };

// render() {
//   const { selectedContact, currentUser, sidebarVisible } = this.props;

//   if (selectedContact.chat && currentUser) {
//     let currentDate;
//     const messages = selectedContact.chat.messages
//       ? selectedContact.chat.messages
//       : [];

//     if (messages.length) {
//       currentDate = moment(messages[0].timestamp);
//     }

//     return (
//       <div className='chat'>
//         <Header contact={selectedContact} />
//         <div ref={this.chatMessagesRef} className='chat__messages'>
//           {messages.length ? (
//             <div className='chat__messages__date'>
//               {relativeDate(currentDate)}
//             </div>
//           ) : null}
//           {messages.length
//             ? messages.map((message) => {
//                 const date = moment(message.timestamp);

//                 if (!date.isSame(currentDate, 'day')) {
//                   currentDate = date;
//                   return (
//                     <Aux key={message.timestamp.getTime()}>
//                       <div className='chat__messages__date'>
//                         {relativeDate(currentDate)}
//                       </div>
//                       <Message currentUser={currentUser} message={message} />
//                     </Aux>
//                   );
//                 }
//                 return (
//                   <Message
//                     key={message.timestamp.getTime()}
//                     currentUser={currentUser}
//                     message={message}
//                   />
//                 );
//               })
//             : null}
//         </div>
//         <input send={this.sendMessageHandler} />
//       </div>
//     );
//   }

//   return (
//     <div className={`chat${sidebarVisible ? ' translated' : ''}`}>
//       <Header contact={selectedContact} />
//       <div className='chat__messages' />
//       <input send={this.sendMessageHandler} />
//     </div>
//   );
// }
