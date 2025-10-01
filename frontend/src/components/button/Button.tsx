import "./button.css";

interface Props {
   alt?: string;
   iconPath?: string;
   text?: string;
   onClick?: () => void;
   className?: string[];
}

const Button = (props: Props) => {
   const defClassName = "control-button";

   const extraClasses = props.className
      ? props.className.map((cls) => `${defClassName}--${cls}`).join(" ")
      : "";

   return (
      <button className={`${defClassName} ${extraClasses}`} onClick={props.onClick}>
         {props.text ? (
            <span className={`${defClassName}__text`}>{props.text}</span>
         ) : (
            <img className={`${defClassName}__image`} src={props.iconPath} alt={props.alt} />
         )}
      </button>
   );
};

export default Button;
