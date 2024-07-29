
import sendButton from "../../utils/send's/sendButton.util";

export const handleInsuranceStep = async (session: any, content: { from: any; }) => {
    session.data.service = content;
    session.step = "exam";
    sendButton("Qual será o método de pagamento?", [
      { id: "pix", title: "Pix" },
      { id: "dinheiro", title: "Dinheiro" },
      { id: "cartao", title: "Cartao" },
    ]);
};

export default handleInsuranceStep;
