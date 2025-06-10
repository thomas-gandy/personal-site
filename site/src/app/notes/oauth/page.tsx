import { Container, Text, Stack, Anchor, Title, List, ListItem } from "@mantine/core";
import Link from "next/link";

const OAUTH_RFC_URL = "https://www.rfc-editor.org/rfc/pdfrfc/rfc6749.txt.pdf";
const OAUTH_NET_URL = "https://oauth.net/2/";

const intro = (
  <>
    <Title>OAuth 2.0</Title>
    <Text>
      This note page describes the problems that existed before OAuth, what OAuth is, and how it
      works. It also goes through the different possible OAuth flows. All the content here is an
      accumulation from the&nbsp;.
      <Anchor component={Link} href={OAUTH_RFC_URL}>
        OAuth 2.0 RFC 6749
      </Anchor>
      &nbsp;and the&nbsp;
      <Anchor component={Link} href={OAUTH_NET_URL}>
        OAuth.net site
      </Anchor>
      .
    </Text>
    <Text>OAuth is an authorization framework. It is not defined as a protocol.</Text>

    <Title order={2}>Situation before OAuth</Title>
    <Text>
      A traditional example of an authorization flow before OAuth would be a web application that
      needs to access an API on behalf of a user. For example, a user would fetch the client code to
      run on their browser. The client code would want to make API requests to a server (which could
      be the same server the client code came from). However, the API likely does not want to accept
      any requests to it (especially if the)
    </Text>

    <Title order={2}>Task of OAuth</Title>
    <Text>
      The overall task of OAuth is to solve the shortcomings discussed in the previous section.
    </Text>

    <Title order={2}>Action of OAuth</Title>
    <Text>
      This section goes through the implementation details of how OAuth can be implemented.
    </Text>
    <Text>There are some OAuth key terms that to be familiar with...</Text>

    <Title order={4}>Resource owner</Title>
    <Text>
      An entity that has the ability to grant access to a protected resource. For example, a human
      that may want to grant access to a third-party application to let the third-party access their
      information on a different app. Alternatively, it could be an application that wants to let
      another application access its APIs.
    </Text>

    <Title order={4}>Resource server</Title>
    <Text>
      The server that fronts (or &apos;protects&apos;) the protected resource. This server receives
      the requests that contain access tokens that it will then delegate to the authorization server
      to verify.
    </Text>

    <Title order={4}>Client</Title>
    <Text>
      An app that is making requests to the resource server. The resource owner must have already
      delegated access to the client such that the client has been provided an access token by the
      authorization server.
    </Text>

    <Title order={4}>Authorization server</Title>
    <Text>Issues access tokens to clients.</Text>

    <Title order={2}>Result of OAuth</Title>
    <Text></Text>

    <Title order={2}>How OAuth differs from SAML</Title>
  </>
);

export default function Notes() {
  return (
    <Container size={"sm"} mt={"xl"} mb={"xl"}>
      <Stack>{intro}</Stack>
    </Container>
  );
}
