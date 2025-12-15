import ReuseableFileConverter from "@/components/features/FileConverter/ReuseableFileConverter";
import Container from "@/components/global/Container";

const Page = async ({ params }: { params: Promise<{ "from-to": string }> }) => {
  const { "from-to": fromTo } = await params;

  return (
    <div>
      <Container>
        <ReuseableFileConverter
          from={fromTo.split("-to-")[0]}
          to={fromTo.split("-to-")[1]}
        />
      </Container>
    </div>
  );
};

export default Page;
