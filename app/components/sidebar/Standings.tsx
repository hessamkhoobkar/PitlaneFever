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
    <div className="flex flex-col justify-start items-start gap-2 w-full">
      {topFiveDriver.map((driver: DriverStandings) => (
        <div
          key={driver.Driver.driverId}
          className="bg-secondary rounded-2xl p-4 w-full relative"
        >
          <span className="absolute top-1 -left-1 text-sm font-black opacity-40">
            {driver.position}
          </span>
          <div className="flex justify-start items-center w-full">
            <span className="text-xl font-bold">
              {driver.Driver.givenName} {driver.Driver.familyName}
            </span>
            <span className="ms-auto">
              <span className="text-sm me-2 opacity-30">points:</span>
              <span>{driver.points}</span>
            </span>
          </div>
          <div className="flex justify-start items-center w-full">
            <span>{driver.Constructors[0].name}</span>
            <span className="ms-auto">
              <span className="text-sm me-2 opacity-30">wins: </span>
              <span>{driver.Driver.permanentNumber}</span>
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
