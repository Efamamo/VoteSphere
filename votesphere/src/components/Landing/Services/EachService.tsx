interface EachServiceProp {
  image: string;
  description: string;
  title: string;
}

export default function EachService(prop: EachServiceProp) {
  return (
    <div className="max-w-sm">
      <img className="rounded-lg" src={prop.image} />
      <h2 className="mt-8 text-xl font-bold">{prop.title}</h2>
      <p>{prop.description}</p>
    </div>
  );
}
