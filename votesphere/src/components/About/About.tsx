import Mission from './Mission';
import Team from './Team/Team';
import Value from './Value';

export default function About() {
  return (
    <div className="mx-16">
      <h2 className="text-3xl font-bold text-center">About Us</h2>
      <Mission />
      <Value />
      <Team />
    </div>
  );
}
