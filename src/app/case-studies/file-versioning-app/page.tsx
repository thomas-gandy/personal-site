import { Container, List, ListItem, Stack, Text, Title } from "@mantine/core";

const intro = <>
  <Title>Case Study - File Version Management</Title>
  <Text>
    I recently had to make a file version tracker to track different revisions of files that were
    created to help develop 3D printed components. These files were generally not text based and
    some included proprietary formats. Files were to be stored in a Network Attached Storage (NAS)
    to be readily available for engineers to access and open in CAD tools. We did not look into
    binary diffing.
  </Text>
  <Text>
    The overall flow we envisioned was engineers would have a file for a component they wanted to
    version; this could be a technical drawing (PDF), some CAD file (STEP) or some other type.
    They would select (or create) the component they wanted, select the category, drop in the file
    and submit. We wanted to ensure nobody had write access to the NAS section we were using, only
    read access, to avoid people from modifying the structure our app expected. This also meant we
    did not really want the frontend app writing directly to the NAS from the user&apos;s machine,
    as it would require using their credentials, meaning they would also have manual write access.
    Therefore, we opted for the API to do the file writing.
  </Text>
  <Text>
    We ended up having a web app frontend and C# server. On-premise machines were for simulation
    work so the app was to be hosted in Azure. We were not sure how many users would be using the
    app or how large the files could be. We wanted to minimise cloud costs by using as little
    compute resources as possible. Therefore, we wanted to be able handle spikes in usage without
    needing to allocate much compute or manually vertically scale the app. Therefore, when someone
    uploads a file to be versioned, the file initially gets placed into a &apos;staging&apos;
    container in Azure blob storage.
  </Text>
  <Text>
    Additional file information needs to be stored, such as who the author is, any change
    description, last modified date-time, etc.
  </Text>
  <Text>
    This led us to the interesting part of selecting a database type to store the file metadata
    entries. We had several options:
  </Text>
  <List>
    <ListItem>SQL</ListItem>
    <ListItem>NoSQL structured key-value</ListItem>
    <ListItem>NoSQL document</ListItem>
  </List>
  <Text>
    The next few sections will walk through the pros and cons of each, what a solution for our
    problem would look like in each, and why we ended up going with a NoSQL document database.
  </Text>
  <Title order={3}>SQL</Title>
  <Text>Example relational databases are PostgreSQL, Microsoft SQL Server, and MySQL.</Text>
  <Title order={3}>NoSQL structured key-value</Title>
  <Text>An example NoSQL structured key-value database is Azure table storage.</Text>
  <Title order={3}>NoSQL document (e.g. Azure Cosmos DB, MongoDB, ...)</Title>
  <Text>
    Example NoSQL document databases are Document DB for Azure Cosmos DB and MongoDB. Azure Cosmos
    DB is a multi-modal NoSQL database, so is not limited to just document-based NoSQL databases.
  </Text>
</>;

export default function Notes() {
  return (
    <Container size={"sm"} mt={"xl"} mb={"xl"}>
      <Stack>{intro}</Stack>
    </Container>
  );
}
