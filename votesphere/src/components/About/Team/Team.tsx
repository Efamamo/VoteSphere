import Card from './Card';
import efa from '../../../assets/144004369.jpeg';
import beka from '../../../assets/beka.jpg';
export default function Team() {
  return (
    <div className="mt-28 mb-20">
      <h2 className="text-3xl font-bold text-center">Our Team</h2>
      <div className="flex justify-center mt-8 gap-10">
        <Card image={efa} name="Ephrem Mamo" title="Frontend Developer" />
        <Card image={beka} name="Beka Birhanu" title="Backend Developer" />
      </div>
    </div>
  );
}
