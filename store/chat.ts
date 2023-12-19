import Faq from "../assets/json/faq.json";
import chatResponse from "../assets/json/responses.json";
import chatAction from "../assets/json/actions.json";
import { action, makeObservable, observable } from "mobx";
import { NlpManager } from "node-nlp-rn";
import { user } from "./user";

const manager = new NlpManager({ languages: ["en"], forceNER: true });

const ChatUser = {
  _id: 2,
  name: "chat",
  avatar: "https://dcblog.b-cdn.net/wp-content/uploads/2021/02/Full-form-of-URL-1.jpg",
};

const User = {
  _id: 1,
  name: user.name,
};

class Chat {
  messages = [];

  constructor() {
    makeObservable(this, {
      messages: observable,
      send: action,
      addAction: action,
      addResponse: action,
    });

    this.trainManager();
    this.addAction(1);
  }

  addUserMessage(message: string) {
    let tmpMessage: any = this.messages;

    tmpMessage = [
      {
        _id: Math.random() * 1000000,
        text: message,
        createdAt: new Date(),
        user: User,
      },
      ...tmpMessage,
    ];
    this.messages = tmpMessage;
  }

  addAction(id: any) {
    for (let i = 0; i < chatAction?.length; i++) {
      if (id === chatAction[i]?.id) {
        let tmpMessage: any = this.messages;

        tmpMessage = [
          {
            _id: Math.random() * 1000000,
            text: "Options",
            messageType: "Options",
            options: chatAction[i]?.options,
            createdAt: new Date(),
            user: ChatUser,
          },
          ...tmpMessage,
        ];
        this.messages = tmpMessage;
      }
    }
  }

  addResponse(id: any) {
    for (let i = 0; i < chatResponse?.length; i++) {
      if (id === chatResponse[i]?.id) {
        let tmpMessage: any = this.messages;

        console.log("res", chatResponse[i]?.messageType);

        if (chatResponse[i]?.messageType === "text") {
          tmpMessage = [
            {
              _id: Math.random() * 1000000,
              text: chatResponse[i]?.text,
              createdAt: new Date(),
              user: ChatUser,
            },
            ...tmpMessage,
          ];
        } else if (chatResponse[i]?.messageType === "Related Question") {
          tmpMessage = [
            {
              _id: Math.random() * 1000000,
              messageType: chatResponse[i]?.messageType,
              relatedQuestionAnswer: chatResponse[i]?.relatedQuestionAnswer,
              createdAt: new Date(),
              user: ChatUser,
            },
            ...tmpMessage,
          ];
        }
        this.messages = tmpMessage;
      }
    }
  }

  trainManager = async () => {
    for (let i = 0; i < Faq.length; i++) {
      manager.addDocument("en", Faq[i].question, Faq[i].question);
      manager.addAnswer("en", Faq[i].answer, Faq[i].question);
    }

    await manager.train();
  };

  getResponse = async (question: String) => {
    const res = await manager.process("en", question);

    let bestQustionLable = "";
    let bestAccuracy = 0;

    let relatedQuestionLable = [];

    for (let i = 0; i < res?.classifications?.length; i++) {
      if (
        res?.classifications[i]?.value > bestAccuracy &&
        res?.classifications[i]?.label !== "None" &&
        res?.classifications[i]?.value > 0.02
      ) {
        bestQustionLable = res?.classifications[i]?.label;
        bestAccuracy = res?.classifications[i]?.value;
      }
      if (res?.classifications[i]?.value > 0.02 && res?.classifications[i]?.label !== "None") {
        relatedQuestionLable.push(res?.classifications[i]?.label);
      }
    }

    if (bestQustionLable) {
      relatedQuestionLable = relatedQuestionLable.filter((item) => item !== bestQustionLable);
    }

    let bestAnswer = "";
    let relatedQuestionAnswer = [];

    for (let i = 0; i < Faq.length; i++) {
      if (bestQustionLable && bestQustionLable === Faq[i]?.question) {
        bestAnswer = Faq[i]?.answer;
      }

      for (let j = 0; j < relatedQuestionLable?.length; j++) {
        if (relatedQuestionLable[j] === Faq[i]?.question) {
          relatedQuestionAnswer.push(Faq[i]);
        }
      }
    }

    if (!bestAnswer && relatedQuestionAnswer?.length === 0) {
      let tmpMessage: any = this.messages;
      tmpMessage = [
        {
          _id: Math.random() * 1000000,
          text: "I'm sorry, but I couldn't find a solution to your query. It's possible that your question is unique or not covered in the existing FAQs. Please consider rephrasing your question or providing more details, and I'll do my best to assist you. If the issue persists, you may also reach out to [customer support/contact information] for personalized assistance. Thank you for your understanding.",
          createdAt: new Date(),
          user: ChatUser,
        },
        ...tmpMessage,
      ];
      this.messages = tmpMessage;
    }

    if (bestAnswer) {
      let tmpMessage: any = this.messages;
      tmpMessage = [
        {
          _id: Math.random() * 1000000,
          text: bestAnswer,
          createdAt: new Date(),
          user: ChatUser,
        },
        ...tmpMessage,
      ];
      this.messages = tmpMessage;
    }

    if (relatedQuestionAnswer?.length !== 0) {
      let tmpMessage: any = this.messages;
      tmpMessage = [
        {
          _id: Math.random() * 1000000,
          text: "Related Question",
          createdAt: new Date(),
          user: ChatUser,
          messageType: "Related Question",
          relatedQuestionAnswer: relatedQuestionAnswer,
        },
        ...tmpMessage,
      ];
      this.messages = tmpMessage;
    }
  };

  send = (message: any) => {
    let tmpMessage: any = this.messages;
    tmpMessage = [message[0], ...tmpMessage];
    this.messages = tmpMessage;

    this.getResponse(message[0]?.text);
  };
}

export const chat = new Chat();
