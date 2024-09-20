interface CardProp {
  image: string;
  name: string;
}
export default function Card(prop: CardProp) {
  return (
    <div className="shadow-lg rounded-lg px-4 py-2 max-w-96">
      <img className="rounded-lg" src={prop.image} alt="" />
      <h3 className="text-xl mt-1 font-semibold">{prop.name}</h3>
    </div>
  );
}
