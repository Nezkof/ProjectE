import "./button.css";

interface Props {
   iconPath: string;
   alt: string;
}

const Button = (props: Props) => {
   return (
      <>
         <button className="control-button">
            <img className="control-button__image" src={props.iconPath} alt={props.alt} />
         </button>
      </>
   );
};

export default Button;
