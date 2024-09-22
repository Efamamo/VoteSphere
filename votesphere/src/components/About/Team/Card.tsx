interface CardProp {
  image: string;
  name: string;
  title: string;
  link: string;
}
export default function Card(prop: CardProp) {
  return (
    <a href={prop.link} target="_blank">
      <div className="shadow-lg rounded-lg px-4 py-2 mt-12 max-w-72 mx-auto md:max-w-80">
        <img className="rounded-lg" src={prop.image} alt="" />
        <h3 className="text-xl mt-1 font-semibold">{prop.name}</h3>
        <p className="text-lg">{prop.title}</p>
      </div>
    </a>
  );
}
