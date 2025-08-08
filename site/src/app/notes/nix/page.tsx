import { Code, Container, SimpleGrid, Stack, Text, Title } from "@mantine/core";
import { HeroText } from "../../ui/HeroText";

const noAttributePath = `{
  a = {
    b = {
      c = 1;
      d = 2;
    };
  };
}
  `;

const attributePath = `{
    a.b.c = 1; a.b.d = 2;
}

or, a combination of nested and path

{
    a.b = { c = 1; d = 2; };
}   
`;

const recursiveAttributeSet = `rec {
    a.b = {
        c = a.b.d; d = 2;
    };
}`;

const letBindingWithAttributeSetResult = `let
    a = { b = { c = { d = 1; }; }; };
    e = a.b;
in
    e.c
`;

const letBindingWithAttributeSetResultValue = "{ d = 1; }";

const letBindingWithListResult = `let
    b = a;
    a = 3;
in
    [a b]
`;
const letBindingWithListResultValue = "[ 3 3 ]";
const letBindingNested = `let
  a = 1;
  b =
    let
      c = a + 1;
    in
      c;
in b`;

const recursiveAttributeSetResult = `{ a = { b = { c = 2; d = 2; }; }; }`;

const withExpression = "let a = { b = { c = { d = 3; }; }; }; in with a.b; [ c c.d ]";
const withExpressionValue = "[ { d = 3; } 3 ]";
const withExpressionOutOfScope = `let
  a = {
    x = 1;
    y = 2;
    z = 3;
  };
in
{
  b = with a; [ x y z ];
  c = x;
}`;
const withExpressionInLetBlock = `let
  a = {
    b = 1;
  };
  c = with a; [ b ];
in c`;

const letExpressionWithInherit = `let
  a = 1;
  b =
    let
      inherit a;
    in
      a + 1;
in b`;

const letExpressionWithoutInherit = `let
  a = 1;
  b =
    let
      c = a; # 'a' is copied into scope
    in
      c + 1;
in b`;

const letExpressionWithAttributeSetInherit = `let
  g = {
    h = 3;
    i = 4;
  };
  a = let
    b = {
      c = 1;
    };
    inherit g;
  in g;
in a

`;

const letExpressionWithAttributeSetInheritNested = `let
  g = {
    h = 3;
    i = {
      j = { k = 4; };
      l = 5;
    };
  };
  a = let
    b = { c = 1; };
    inherit (g.i) j;
  in j;
in a`;

const illegalInherit = `let
  g = { h = 3; i = 4; };
  a = let
    b = { c = 1; };
    d = inherit g; # illegal
  in b;
in a`;

const withExpressionEquivalentToInherit1 = `let
  a = {
    b = { c = 1; };
  };
  d = let
    e = with a; b;
  in e;
in d`;
const inheritEquivalentToWithExpression1 = `let
  a = {
    b = { c = 1; };
  };
  d = let
    inherit (a) b;
  in b;
in d`;
const withExpressionEquivalentToInherit2 = `let
  a = {
    b = {
      c = { z = 1; };
    };
  };
  d = let
    e = with a.b; c;
  in e;
in d`;
const inheritEquivalentToWithExpression2 = `let
  a = {
    b = {
      c = { z = 1; };
    };
  };
  d = let
    inherit (a.b) c;
  in c;
in d`;

const interpolationExpression = `"Hello, \${<expression>}!"`;

const nixpkgsImport = `let
  pkgs = import <nixpkgs> {}
in
  pkgs.lib.strings.toUpper "this is an uppercase string"`;
const nixpkgsImportPinned = `let
  nixpkgs = fetchTarball "https://github.com/NixOS/nixpkgs/archive/06278c77b5d162e62df170fec307e83f1812d94b.tar.gz";
  pkgs = import nixpkgs {};
in
pkgs.lib.strings.toUpper "always pin your sources"`;

const pathInStringInterpolation1 = `"\${./data}"`;
const pathInStringInterpolation2 = `"\${<nixpkgs>}"`;

const content = (
  <>
    {/* <Title>Nix</Title> */}

    <Title order={2}>How to run Nix code</Title>
    <Text>
      You can experiment with Nix expressions in a Read Evaluate Print Loop (REPL) environment with the{" "}
      <Code>nix repl</Code> command. If you want to write a reproducible Nix file, you can put the Nix code into a file
      with a <Code>.nix</Code> extension. Then, you can evaluate that file with the{" "}
      <Code>nix-instantiate --eval &lt;file&gt;</Code> command. If your file is named <Code>default.nix</Code>, then you
      only need to run <Code>nix-instantiate --eval</Code>.
    </Text>

    <br />
    <Title order={2}>Difference between Nix and the Nix language</Title>
    <Text></Text>

    <br />
    <Title order={2}>The Nix Language</Title>
    <Text>
      Nix is a functional (like Haskell or F#), lazy (like me), dynamically-typed (like Python or JavaScript), and
      domain-specific language (like SQL or HCL for Terraform).
    </Text>

    <br />
    <Title order={3}>Attribute sets</Title>
    <Text>
      An attribute set is a collection of name-value pairs; it has behaviour like a dictionary. The structure of an
      attribute set is similar to JSON; when the attribute set doesn&apos;t contain a function, it uses semi-colons to
      separate between attributes rather than a comma, an equals (=) sign rather than a colon (:) to assign a value to
      an attribute, attribute names generally don&apos;t need speechmarks, and list items are separated with whitespace.
      Keys must be unique.
    </Text>
    <Text>
      If there is a nested attribute in an attribute set, it can be specified with an attribute path (as below) rather
      than having to type out the entire nested brace syntax.
    </Text>
    <SimpleGrid cols={2}>
      <Stack>
        <Title order={5}>Without attribute path</Title>
        <Code block>{noAttributePath}</Code>
      </Stack>
      <Stack>
        <Title order={5}>With attribute path</Title>
        <Code block>{attributePath}</Code>
      </Stack>
    </SimpleGrid>
    <Text>Attribute set values can be accessed with dot notation.</Text>

    <br />
    <Title order={3}>Recursive attribute sets</Title>
    <Text>
      Recursive attribute sets allow attributes within a set to access other attributes in the same set. Any cycles will
      result in an infinite recursion error. It does not matter what order attributes are defined in, even if an
      attribute that depends on another is defined before the attribute it references. In the example below, the nested
      attribute <Code>a.b.c</Code> will be set to <Code>2</Code> and would fail in a normal attribute set.
    </Text>
    <Code block>{recursiveAttributeSet}</Code>
    <Text>The value result of a recursive attribute set is an attribute set</Text>
    <Code block>{recursiveAttributeSetResult}</Code>

    <br />
    <Title order={3}>
      <Code fz={"inherit"}>let</Code> expression binding
    </Title>
    <Text>
      Using <Code>let</Code> expressions define a short, local scoped block where variables can be defined. The let
      expression takes the form of <Code>let ... in ...</Code>. Assignment is done in the first <Code>...</Code> block.
      The second <Code>...</Code> block is the scope where it is valid for expressions to access the variables.
    </Text>
    <Text>
      Similar to recursive attribute sets, assignments within the let block can reference other assignments in the same
      block. It doesn&apos;t matter what order the assignments are performed, as long as there is no cycle. However,
      unlike recursive attribute sets, expressions after the <Code>in</Code> keyword are not confined to producing an
      attribute set value.
    </Text>
    <SimpleGrid cols={2}>
      <Stack>
        <Title order={5}>Producing an attribute set</Title>
        <Code block>{letBindingWithAttributeSetResult}</Code>
        <Code block>{letBindingWithAttributeSetResultValue}</Code>
      </Stack>
      <Stack>
        <Title order={5}>Producing a list</Title>
        <Code block>{letBindingWithListResult}</Code>
        <Code block>{letBindingWithListResultValue}</Code>
      </Stack>
    </SimpleGrid>
    <Text>Let expressions can be nested like so</Text>
    <Code block>{letBindingNested}</Code>

    <br />
    <Title order={3}>
      <Code fz={"inherit"}>with</Code> expression
    </Title>
    <Text>
      The <Code>with ...</Code> expression is like a C++ <Code>using namespace</Code> expression for an attribute set
      which means you don&apos;t have to keep referencing ancestors of an attribute in a nested attribute set.
    </Text>
    <Code block>{withExpression}</Code>
    <Code block>{withExpressionValue}</Code>
    <Text>
      The attributes made available with the <Code>with</Code> expression are only in-scope for the expression
      immediately following the semicolon (;) of the <Code>with</Code> expression. So, the below Nix code would not
      work, as <Code>x</Code> is no longer accessible in the assignment to <Code>c</Code>.
    </Text>
    <Code block>{withExpressionOutOfScope}</Code>
    <Text>
      Due to the fact that <Code>with</Code> is an expression, it can be placed anywhere where a value can be returned.
      That means they are not limited to just the <Code>in</Code> block of a <Code>let</Code> expression. They can also
      be part of an assignment in the <Code>let</Code> block as shown below.
    </Text>
    <Code block>{withExpressionInLetBlock}</Code>
    <Code block>1</Code>

    <br />
    <Title order={3}>
      <Code fz={"inherit"}>inherit</Code> shorthand
    </Title>
    <Text>
      The <Code>inherit ...</Code> shorthand allows you to extract an assignment from some scope (whether that be the
      current scope or above) and assign it to an assignment in the current scope that has the same name (i.e. just the
      immediate name of the value in the outer scope and not its pathname). It does not extract assignments from{" "}
      <Code>in</Code> blocks as it is illegal to have assignments in <Code>in</Code> blocks so wouldn&apos;t make sense
      in the first place. It is essentially just syntatical sugar and the same effect can be achieved without the
      keyword by copying values across. The <Code>inherit</Code> keyword can be used inside the block of a{" "}
      <Code>let</Code> or the block of an <Code>in</Code>. If <Code>inherit</Code> is used in a <Code>in</Code> block,
      it <i>must</i> be inside of attribute set braces (more on deriving where <Code>inherit</Code> can be used in a
      sec).
    </Text>
    <Text>
      I&apos;ll go through a few different use cases where using <Code>inherit</Code> is useful. The first (admittedly
      contrived, but most fundamental) example below shows how you can use <Code>inherit</Code> to avoid needing to
      redefine an outer <Code>let</Code> block variable to reference it inside a nested <Code>let</Code> block.
    </Text>
    <SimpleGrid cols={2}>
      <Stack>
        <Title order={5}>With inherit</Title>
        <Code block>{letExpressionWithInherit}</Code>
        <Code block>2</Code>
      </Stack>
      <Stack>
        <Title order={5}>Without inherit</Title>
        <Code block>{letExpressionWithoutInherit}</Code>
        <Code block>2</Code>
      </Stack>
    </SimpleGrid>
    <Text>
      It is a contrived example because in reality you could just access <Code>a</Code> directly from inside the nested{" "}
      <Code>in</Code> block without needing to redefine the value in the nested <Code>let</Code> block. However, it does
      let you see how <Code>inherit</Code> can be used in its most simple form to bring an assignment into a nested
      scope (and in this case meaning you don&apos;t have to copy <Code>a</Code> across to a new nested assignment).
      Additionally, it gives light to how <Code>inherit</Code> is just syntatical sugar and is essentially just a macro.
    </Text>
    <Text>
      The previous example showed how it is legal to <Code>inherit</Code> atomically typed assignments into nested
      scopes. The next example shows how you can <Code>inherit</Code> assigned values from within an attribute set.
    </Text>
    <SimpleGrid cols={2}>
      <Stack>
        <Title order={5}>Single inheritance</Title>
        <Code block>{letExpressionWithAttributeSetInherit}</Code>
        <Code block>2</Code>
      </Stack>
      <Stack>
        <Title order={5}>Nested inheritance</Title>
        <Code block>{letExpressionWithAttributeSetInheritNested}</Code>
        <Code block>2</Code>
      </Stack>
    </SimpleGrid>
    <Text>
      Note how when using <Code>inherit</Code> to extract nested properties from an attribute set you can use simple
      syntax like <Code>inherit g;</Code> for non-nested inheritance to essentially bring the entirety of <Code>g</Code>{" "}
      into scope for the <Code>let</Code> expression for the <Code>a</Code> assignment. Alternatively, if you want to
      extract out certain properties of a previously defined attribute set, you can use nested inheritance by specifying
      the path to the parent of the property you want to extract. This parent property is not brought into the current{" "}
      <Code>inherit</Code> scope, but you can then specify multiple properties inside of the parent attribute set to
      bring into the current scope simply by space seprated names.
    </Text>
    <Title order={5}>
      So, where can I use <Code fz={"inherit"}>inherit</Code> then?
    </Title>
    <Text>
      <Code>inherit</Code> is not an expression; it does not produce a value, it only causes an assignment to be made.
      Therefore, it is not legal for an <Code>inherit</Code> to exist at the top level of an <Code>in</Code> block
      (which is only for expression evaluation, not assignment) unless it is part of an attribute set within an{" "}
      <Code>in</Code> block. Assignments are legal in <Code>let</Code> blocks so <Code>inherit</Code> statements are
      allowed at the top level there.
    </Text>
    <Text>
      It is illegal to use <Code>inherit</Code> in a non attribute set assignment.
    </Text>
    <Code block>{illegalInherit}</Code>
    <Title order={5}>
      How does <Code fz={"inherit"}>inherit</Code> differ to a <Code fz={"inherit"}>with</Code> expression?
    </Title>
    <Text>
      <Code>with</Code> only works when bringing attributes from a set temporarily into scope for the duration of the
      single expression immediately following the semicolon of the initial <Code>with</Code> section.{" "}
      <Code>inherit</Code> brings across assignments (whether that be attribute sets or another type) permanently into
      scope for the duration of said scope. When using <Code>inherit</Code>, assignments brought into the new scope are
      forced to have the same name. If you want to extract some attribute from a set and assign it in the new scope with
      a different name, you are best to use <Code>with</Code>.
    </Text>
    <Text>
      The below examples show how <Code>with</Code> and <Code>inherit</Code> can be used individually in a{" "}
      <Code>let</Code> expression to achieve the same result.
    </Text>
    <SimpleGrid cols={2}>
      <Stack>
        <Title order={5}>
          <Code fz={"inherit"}>with</Code> expression
        </Title>
        <Code block>{withExpressionEquivalentToInherit1}</Code>
        <Code block>2</Code>
      </Stack>
      <Stack>
        <Title order={5}>
          <Code fz={"inherit"}>inherit</Code> statement
        </Title>
        <Code block>{inheritEquivalentToWithExpression1}</Code>
        <Code block>2</Code>
      </Stack>
    </SimpleGrid>
    <Text>Below is yet another example that is similar but with more nesting.</Text>
    <SimpleGrid cols={2}>
      <Stack>
        <Title order={5}>
          <Code fz={"inherit"}>with</Code> expression
        </Title>
        <Code block>{withExpressionEquivalentToInherit2}</Code>
        <Code block>2</Code>
      </Stack>
      <Stack>
        <Title order={5}>
          <Code fz={"inherit"}>inherit</Code> statement
        </Title>
        <Code block>{inheritEquivalentToWithExpression2}</Code>
        <Code block>2</Code>
      </Stack>
    </SimpleGrid>
    <Text>
      Notice how you can drill down to specify the parent attribute set for both <Code>with</Code> and{" "}
      <Code>inherit</Code> with dot-notation, and then specify which attributes to make available in the immediate
      expression (in the case of <Code>with</Code>) and the overall nested scope (in the case of <Code>inherit</Code>).
    </Text>

    <br />
    <Title order={3}>String interpolation</Title>
    <Text>
      Only values of expressions that can be represented by character strings are able to be used in string
      interpolation. An interpolation expression can look like <Code>{interpolationExpression}</Code>. Nested
      interpolation strings are possible but not recommended. If an expression has a dollar sign before it but no
      quotations then it is not an interpolated string and is usually denoting a shell variable.
    </Text>

    <br />
    <Title order={3}>Indented strings</Title>
    <Text>
      Indented strings in Nix are acheived with double single quotes on either side. Nix will find the line with the
      smallest number of spaces at the start and strip that many spaces from the start of the other lines.
    </Text>

    <br />
    <Title order={3}>File system paths</Title>
    <Text>
      Same as Bash; <Code>.</Code> for local, <Code>..</Code> for parent, absolute and relative paths are the same.
    </Text>

    <br />
    <Title order={3}>Lookup paths</Title>
    <Text>
      An identifier that expands to a filesystem path; for example, the literal value <Code>&lt;hello&gt;</Code>. It
      depends on the value of <Code>builtins.nixpath</Code> or the <Code>NIX_PATH</Code> environment variable, which is
      a configuration setting specifying a list of paths in the form <Code>foo=/custom/path:bar=/another/path</Code>.
      So, given the identifier <Code>hello</Code> above, it would resolve to <Code>/my/baz</Code> given the following
      nixpath <Code>foo=/foo:hello:/my/baz</Code>. You can specify subpaths of the lookup path like{" "}
      <Code>&lt;hello/goodbye&gt;</Code>, which will expand to the value of <Code>/my/baz/goodbye</Code>.
    </Text>
    <Text>The Nix documentation says to try and avoid lookup paths in practice.</Text>

    <br />
    <Title order={3}>Functions</Title>
    <Text>
      Nix functions have no names (so are known as lambdas) and always take exactly one argument. They are another way
      of assigning names to values (assignments), alongside attribute sets and <Code>let</Code> expressions.
    </Text>
    <Text>
      An example of a single argument function definition is <Code>x: x + 1</Code>. Although functions take only one
      argument, it is possible to pass multiple by nesting, essentially creating nested scopes so that a nested function
      can read arguments declared in a higher function scope; for example, <Code>x: y: x + y</Code>. This is known as
      currying; the definition of which is translating a function that takes multiple arguments into a sequence of
      families of functions, each taking a single argument.
    </Text>
    <Text>
      An example with an attribute set argument is <Code>&#123; a, b &#125;: a + b</Code>; leaving out or specifying
      additional attributes in the set argument is an error. Default values can be provided for attributes in a set like
      so <Code>&#123; a, b ? 5 &#125;: a + b</Code>; all attributes can have default values. You can specify a set is
      allowed more attributes than specified like so <Code>&#123; a, b ? 5, ...&#125;: a + b</Code>. Sets can be named
      like so <Code>args@&#123; a, b ? 5 &#125;: a + b + args.c</Code>; this is useful if you want to access an
      attribute in the set argument that was not explicitly specified, made possible with the <Code>...</Code> keyword.
    </Text>
    <Text>
      Functions can be assigned to names like so <Code>let f = x: x + 1 in f</Code>. They can be called by specifying
      the argument at the end like <Code>let f = x: x + 1; in f 1</Code> or <Code>(x: x + 1) 1</Code>. When two separate
      expressions around a space are encountered like so <Code>x: x + 1 1</Code>, Nix interprets it as{" "}
      <Code>x: ((x + 1) 1)</Code>, as the plus operator has higher precedence than the space operator (otherwise it
      would be treated as <Code>(x: (x + (1 1)))</Code>, which still wouldn&apos;t work). It then tries to call{" "}
      <Code>(x + 1)</Code> with an argument of <Code>1</Code> which fails as the expression <Code>(x + 1)</Code>{" "}
      produces a value that is not a callable lambda. To solve this, wrap parentheses around the entire expression you
      wish to be treated as a function like so <Code>(x: x + 1) 1</Code>, which will produce a value of <Code>2</Code>.
    </Text>

    <br />
    <Title order={3}>Function libraries</Title>
    <Text>
      There are two common libraries: <Code>builtins</Code> and <Code>pkgs.lib</Code>.
    </Text>
    <Text>
      <Code>builtins</Code> are also known as primitive operations or primops and are implemented in C++ as part of the
      Nix interpreter; an example is the expression <Code>builtins.toString 22</Code>, which returns the value{" "}
      <Code>&quot;22&quot;</Code>. Typically, to use one of the functions provided in <Code>builtins</Code>, you must
      prefix it with <Code>builtins.</Code>. However, there is one builtin, <Code>import</Code>, that is available at
      the top level. <Code>import</Code> takes a filepath to a Nix file and evaluates then returns the contained
      expression. If the path is a directory, it looks for a <Code>default.nix</Code> file; if this file is not found,
      an error occurs. Imported expressions that are lambdas can be applied immediately like so{" "}
      <Code>import &lt;your-path&gt; &lt;argument&gt;</Code>.
    </Text>
    <Text>
      The <Code>nixpkgs</Code> code repository contains a vast number of functions available inside an attribute set
      named <Code>lib</Code>. These functions are written in the Nix language and are not written in C++. To access
      <Code>lib</Code>, you must first import the <Code>nixpkg</Code>, which can be achieved using the{" "}
      <Code>&lt;nixpkg&gt;</Code> lookup path such as
    </Text>
    <Code block>{nixpkgsImport}</Code>
    <Text>
      Some of the functions in <Code>pkgs.lib</Code> are equivalent to the <Code>builtins</Code> of the same name for
      historical reasons. It is not recommended to import using the <Code>&lt;nixpkg&gt;</Code> lookup path directly as
      it is not reproducible and uses whatever version of the repository is available on the host machine. It is
      important to ensure the specific version is pinned, which can be achieved by specifying and fetching the specific
      gzipped tar file like so (as per the snippet from the Nix docs).
    </Text>
    <Code block>{nixpkgsImportPinned}</Code>

    <br />
    <Title order={3}>Paths</Title>
    <Text>
      When paths are specified as a value in string interpolation (for example,{" "}
      <Code>{pathInStringInterpolation1}</Code> or <Code>{pathInStringInterpolation2}</Code>), the contents of the file
      or directory are hashed and placed into the Nix store (a location in the filesystem) as a side effect of the
      expression. The evaluated interpolated string expression evaluates to the Nix store path that the file was placed
      at in the format <Code>/nix/store/&lt;hash&gt;-&lt;file-name&gt;</Code>; the Nix store is typically located at{" "}
      <Code>/nix/store/</Code>.
    </Text>
    <Text>In this sense, Nix essentially acts as a content-addressable filesystem store.</Text>

    <br />
    <Title order={3}>Fetchers</Title>
    <Text>
      Fetchers are built-in impure functions for fetching files over a network during expression evaluation. Example
      functions are <Code>builtins.fetchurl</Code>, <Code>builtins.fetchGit</Code>, and{" "}
      <Code>builtins.fetchClosure</Code>. The expression result from using these builtins when supplying a URI as an
      argument is the filepath in the Nix store; that is, the builtins will perform any necessary operation to fetch the
      file for you (and possibly perform extraction if needed) and then said file will be available to you in the Nix
      store.
    </Text>

    <br />
    <Title order={3}>Derivations</Title>
    <Text>
      As per the Oxford Dictionary of English, the definition of the word derivation means the act of obtaining
      something from a source or origin. For example, the formation of a word from another word or from a root in the
      same or another language.
    </Text>
    <Text>
      The Nix Getting Started docs state derivations are core to Nix and the Nix language, that derivations are run to
      produce a build result, and that build results can in turn be used as inputs for other derivation. However, it is
      still quite vague on what a concrete derivation actually is; the idea of recursive derivations may make sense, but
      what is the base case of a derivation?
    </Text>
    <Text>
      The base case of a derivation is something that always resolves to a Nix store path that contains file. For
      example, by using a lookup path that points directly to a file / set of files, or the builtin{" "}
      <Code>builtins.fetchTar</Code> which will result in a path to the Nix store containing the downloaded file(s).
      Data can be transformed and then the output of the derivation is another file. In short, a derivation is a
      specification of a build that will take place; it specifies the input paths, and the output path is purely
      dependent on the input paths.
    </Text>
    <Text>
      Anything that eventually calls the <Code>derivation</Code> function is also considered a derivation.{" "}
      <Code>derivation</Code> is able to be called anywhere an expression can exist.
    </Text>
    <Title order={4}>Store derivation and deriving path</Title>
    <Text></Text>

    <br />
    <Title order={3}>Impurities</Title>
    <Text>
      Impurities are things that can change outside of functional code. For example, reading files from a filesystem
      that are used as build inputs. Derivations only have access to explicitly declared build inputs. Build inputs are
      files that help derivations describe how to make new derived files. Build inputs can only be specified via
      filesystem paths or dedicated functions.
    </Text>
    <Text>
      Other types of impure expressions are lookup paths and <Code>builtins.currentSystem</Code>, of which Nix
      discourages the use of.
    </Text>
  </>
);

export default function Page() {
  return (
    <>
      <HeroText>
        <HeroText.Title>
          Getting started with the <HeroText.TitleHighlight>Nix</HeroText.TitleHighlight> language
        </HeroText.Title>
        <HeroText.Description>Notes on an introduction to Nix syntax and language features.</HeroText.Description>
      </HeroText>
      <Container size={"sm"} mt={"xl"} mb={"xl"}>
        <Stack>{content}</Stack>
      </Container>
    </>
  );
}
