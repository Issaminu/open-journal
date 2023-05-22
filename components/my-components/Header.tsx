import { getMetaDataType } from "@/app/home/page";
import Image from "next/image";
import { useMemo } from "react";
import journalIcon from "../../public/journal-icon.png";
import { getPrettyDate } from "@/lib/utils";

const Header = ({ metaData }: { metaData: getMetaDataType }) => {
  const latestAddition = useMemo(
    () => getPrettyDate(metaData.latestAddition?.createdAt),
    [metaData.latestAddition?.createdAt]
  );

  return (
    <div className="mt-32 flex w-fit flex-col justify-center p-6">
      <div className="flex flex-row gap-4">
        <Image
          loading="eager"
          src={journalIcon}
          alt="Journal icon"
          width={70}
          style={{ objectFit: "contain" }}
        />
        <div className="flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-[#ecd7d7]">
            The ENSET Journal
          </h1>
          <p className="pt-2 text-[#AC8A89]/70">
            {metaData.articleCount} articles · {metaData.userCount} students
            registered · Latest publication: {latestAddition}
          </p>
        </div>
      </div>

      <p className="whitespace-wrap max-w-[50rem] pt-10 text-justify font-hubot text-lg text-[#EED3D3]">
        The online blog of ENSET Mohammedia. The open platform where students
        can freely express themselves, offering a captivating virtual hub for
        intellectual exploration and thought-provoking articles, personal
        narratives, cutting-edge research, and engaging discussions.
      </p>
    </div>
  );
};

export default Header;
