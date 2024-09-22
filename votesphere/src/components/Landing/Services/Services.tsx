import EachService from './EachService';
import pollManagement from '../../../assets/pollmanagement.webp';
import voting from '../../../assets/voting.png';
import secure from '../../../assets/secure.png';
export default function Services() {
  return (
    <div className="mt-48">
      <h2 className="text-center text-3xl font-bold">Services We Provide</h2>
      <div className="lg:flex justify-evenly mt-11 items-start">
        <EachService
          title="Group Poll Management"
          image={pollManagement}
          description="We make it simple to manage polls within your groups. Create custom groups for your team, community, or organization and effortlessly set up polls. Our system lets you manage multiple groups, track participation, and organize votes, all from a user-friendly interface."
        />
        <EachService
          title="Real-time Voting and Results"
          image={voting}
          description="VoteSphere ensures a seamless voting experience with live, real-time updates. Users can cast their votes instantly, and results are displayed as soon as polling ends. This feature promotes transparency and allows participants to see immediate outcomes, helping your group make timely decisions."
        />
        <EachService
          title="Secure and Private Voting"
          image={secure}
          description="Your security is our priority. We provide robust authentication and authorization features to ensure that only authorized group members can participate in polls. All votes are securely encrypted, maintaining privacy and preventing tampering, so you can trust the integrity of your poll results."
        />
      </div>
    </div>
  );
}
