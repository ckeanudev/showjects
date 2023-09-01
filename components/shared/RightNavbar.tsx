import { fetchAllUsers } from "@/lib/actions/user.actions";
import RightBarCard from "../cards/RightBarCard";
import { ScrollArea } from "../ui/scroll-area";

interface Props {
  authUserId: String;
  dbUserId: String;
  followingList: string[];
}

const RightNavbar = async ({ authUserId, dbUserId, followingList }: Props) => {
  const allUser = await fetchAllUsers(dbUserId);

  return (
    <section className="hidden xl:grid grid-cols-1 grid-rows-2 sticky top-0 right-0 h-screen bg-light-1 py-6 px-4 w-[280px] flex-col gap-1 border-r">
      <div className="p-1 flex flex-col">
        <h2 className="font-semibold text-dark-1 mb-3">Suggested developers</h2>

        <ScrollArea className="flex-1 overflow-auto">
          {allUser.length > 0 ? (
            allUser.map((data, i: number) => {
              return (
                !(data.followers.indexOf(dbUserId) > -1) &&
                i < 10 && <RightBarCard dataUser={data} />
              );
            })
          ) : (
            <p>No developers</p>
          )}
        </ScrollArea>
      </div>

      <div className="p-1 flex flex-col">
        <h2 className="font-semibold text-dark-1 mb-3">
          Developers you follow
        </h2>

        <ScrollArea className="flex-1 overflow-auto">
          {allUser.length > 0 ? (
            allUser.map((data: any, i: number) => {
              return (
                data.followers.indexOf(dbUserId) > -1 && (
                  <RightBarCard dataUser={data} />
                )
              );
            })
          ) : (
            <p>No developers</p>
          )}
        </ScrollArea>
      </div>
    </section>
  );
};

export default RightNavbar;
