import WelcomeImg from "../assets/svg/welcome.svg";
export interface IWelcomeProps {}

export default function Welcome(props: IWelcomeProps) {
  return (
    <div className="welcome">
      <img src={WelcomeImg} alt="Welcome" className="welcome-img" />
      <h3 className="welcome-intro">
        Add User and Start Your Conversation with Him/Her!
      </h3>
    </div>
  );
}
