import { faTwitter } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const TwitterButton: React.FC<
  React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLSpanElement>,
    HTMLSpanElement
  >
> = ({ ...props }) => {
  return (
    <span
      className="w-11 h-11 items-center justify-center inline-flex rounded-full font-bold text-lg  text-white bg-blue-400 hover:bg-blue-600 cursor-pointer transition ease-in duration-300"
      {...props}
    >
      <FontAwesomeIcon className="w-4 h-4" icon={faTwitter} />
    </span>
  );
};

export default TwitterButton;
