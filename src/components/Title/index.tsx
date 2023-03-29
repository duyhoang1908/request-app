import { Link } from "react-router-dom";

type Props = {
  name: string;
  title: string;
};

const Title = ({ name, title }: Props) => {
  return (
    <div>
      <div className="flex gap-1 items-center text-sm mb-5">
        <Link to="/" className="text-gray-500">
          Trang chủ
        </Link>
        <span>/</span>
        <p>{name}</p>
      </div>
      <h1 className="text-3xl font-semibold">{title}</h1>
    </div>
  );
};

export default Title;
