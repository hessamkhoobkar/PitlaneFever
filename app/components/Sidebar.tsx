import Userside from "./Userside";

export default async function Sidebar() {
  const response = await fetch(
    "http://ergast.com/api/f1/current/driverStandings.json"
  );
  const data = await response.json();
  const driverStandings =
    data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

  return (
    <div className="w-4/12 flex flex-col justify-start items-start gap-4">
      <Userside />

      <div className="w-full flex flex-col justify-start items-start gap-2">
        <div className="w-full bg-neutral rounded-2xl p-2 flex justify-start items-center gap-4">
          <button className="btn btn-primary w-1/2">Drivers</button>
          <button className="btn btn-secondary w-1/2">Constructor</button>
        </div>

        <div className="flex flex-col justify-start items-start gap-2 w-full">
          {driverStandings.map((driver) => (
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
      </div>
    </div>
  );
}
