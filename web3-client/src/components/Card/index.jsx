import {formatUnixTimestamp} from "../../utils/dateHandler"

export function Card({ ipfsLink, plantId, classifications, date }) {
  const formattedDate = formatUnixTimestamp(date);
  console.log(date);
  return (
    <div className="flex flex-col w-full h-full bg-light-dark rounded-lg shadow-lg p-4 md:w-1/3 lg:w-[20%]">
      <img src={ipfsLink} alt="Plant Image" className="aspect-square rounded-lg" />
      <aside className="flex items-center justify-between mt-4">
        <p className="font-bold text-white">Identificador da planta</p>
        <p className="font-bold text-white">{plantId}</p>
      </aside>
      <div className="h-[1px] bg-white mt-2 opacity-20" />
      <aside className="flex flex-col mt-4">
        {classifications.map((classification, index) => (
          <>
            <div
              className="rounded-lg bg-primary-dark flex justify-between p-2 my-1"
              key={classification.className}
            >
              <p className="text-sm text-white">{classification.className}</p>
              <p className="text-sm text-white">
                {classification.distribution}%
              </p>
            </div>
          </>
        ))}
        <p className="mt-4 opacity-50 text-white text-sm">
          Data de envio: {formattedDate}
        </p>
      </aside>
    </div>
  );
}
