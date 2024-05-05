import { chatModel } from "../model/chatModel";

export class chatController {
  // static async singUp(req, res) {
  //   const { email } = req.body;
  //   const { name } = req.body;
  //   const singup = await chatModel.singUp({ email, name });
  //   res.json(singup);
  // }
  static async messages(req, res) {
    const { text } = req.body;
    const { from } = req.body;

    const sendMessages = await chatModel.sendMessage({ from, text });
    res.json(sendMessages);
  }
}
