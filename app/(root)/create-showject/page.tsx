import CreateShowject from "@/components/forms/CreateShowject";

async function Page() {
  return (
    <section className="flex-1 min-h-[200vh]  bg-light-2 p-3">
      <h1 className="text-xl font-semibold text-dark-1 border-b-[1px] pb-2">
        Create your showject
      </h1>

      <CreateShowject />
    </section>
  );
}

export default Page;
