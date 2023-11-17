import Image from "next/image";
import Link from "next/link";

interface DriverStandings {
  position: string;
  positionText: string;
  points: string;
  wins: string;
  Driver: {
    driverId: string;
    permanentNumber: string;
    code: string;
    url: string;
    givenName: string;
    familyName: string;
    dateOfBirth: string;
    nationality: string;
  };
  Constructors: Constructors[];
}

interface Constructors {
  constructorId: "red_bull";
  url: "http://en.wikipedia.org/wiki/Red_Bull_Racing";
  name: "Red Bull";
  nationality: "Austrian";
}

export default async function SidebarStandings() {
  const response = await fetch(
    "http://ergast.com/api/f1/current/driverStandings.json"
  );
  const data = await response.json();
  const fulldriverStandings = await data.MRData.StandingsTable.StandingsLists[0]
    .DriverStandings;
  const topFiveDriver = fulldriverStandings.slice(0, 5);

  return (
    <div className="w-full flex flex-col justify-start items-start gap-1 mt-6">
      {topFiveDriver.map((driver: DriverStandings) =>
        driver.position === "1" ? (
          <div className="w-full" key={driver.Driver.driverId}>
            <DriverCardChamp {...driver} />
          </div>
        ) : (
          <div className="w-full" key={driver.Driver.driverId}>
            <DriverCard {...driver} />
          </div>
        )
      )}
      <Link
        href="/standings"
        className="w-full flex justify-center items-center bg-neutral gap-4 p-4 rounded-b-2xl hover:text-primary hover:bg-neutral-focus transition-all duration-300 ease-in-out"
      >
        VIEW FULL STANDINGS
      </Link>
    </div>
  );
}

async function DriverCard(driver: DriverStandings) {
  return (
    <div className="w-full flex justify-start items-center bg-neutral gap-4 px-3">
      <Image
        src={`/drivers/${driver.Driver.driverId}.webp`}
        width={70}
        height={70}
        alt={`${driver.Driver.givenName} ${driver.Driver.familyName}`}
        className=""
      />
      <div className="flex flex-col justify-start items-start">
        <span className="font-normal text-lg">
          {driver.Driver.givenName} {driver.Driver.familyName}
        </span>
        <span className="text-xs text-write">
          {driver.Constructors[0].name}
        </span>
      </div>
      <div className="flex flex-col justify-start items-start ms-auto">
        <span className="font-normal text-lg">{driver.points}</span>
        <span className="text-xs text-write">Points</span>
      </div>
    </div>
  );
}

async function DriverCardChamp(driver: DriverStandings) {
  return (
    <div className="w-full h-24 flex justify-start items-center bg-neutral gap-4 px-3 rounded-t-2xl">
      <Image
        src={`/drivers/${driver.Driver.driverId}.webp`}
        width={120}
        height={120}
        alt={`${driver.Driver.givenName} ${driver.Driver.familyName}`}
        className="-mt-6"
      />
      <div className="flex flex-col justify-start items-start">
        <span className="font-normal text-lg">
          {driver.Driver.givenName} {driver.Driver.familyName}
        </span>
        <span className="text-xs text-write">
          {driver.Constructors[0].name}
        </span>
      </div>
      <div className="flex flex-col justify-start items-start ms-auto">
        <span className="font-normal text-lg">{driver.points}</span>
        <span className="text-xs text-write">Points</span>
      </div>
    </div>
  );
}
