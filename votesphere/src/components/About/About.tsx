import Mission from './Mission';
import Team from './Team/Team';
import Value from './Value';

export default function About() {
  return (
    <div className="mx-6 lg:mx-16">
      <Mission />
      <Value />
      <Team />
    </div>
  );
}
