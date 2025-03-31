// Step 1: Define individual regex components
const protocolPattern = /^(https?:\/\/)/; 
const domainPattern = /^[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; 
const pathPattern = /^\/.*$/;

// Step 2: Write unit tests for each component
describe("Protocol Validation", () => {
  test("should pass for http://", () => {
    expect(protocolPattern.test("http://")).toBe(true);
  });

  test("should pass for https://", () => {
    expect(protocolPattern.test("https://")).toBe(true);
  });

  test("should fail for invalid protocols", () => {
    expect(protocolPattern.test("ftp://")).toBe(false);
  });
});

describe("Domain Validation", () => {
  test("should pass for valid domains", () => {
    expect(domainPattern.test("example.com")).toBe(true);
    expect(domainPattern.test("sub.domain.org")).toBe(true);
  });

  test("should fail for invalid domains", () => {
    expect(domainPattern.test("example")).toBe(false);
    expect(domainPattern.test("domain..com")).toBe(false);
  });
});

describe("Path Validation", () => {
  test("should pass for valid paths", () => {
    expect(pathPattern.test("/path/to/resource")).toBe(true);
    expect(pathPattern.test("/")).toBe(true);
  });

  test("should fail for invalid paths", () => {
    expect(pathPattern.test("path/to/resource")).toBe(false);
    expect(pathPattern.test("")).toBe(false);
  });
});

// Step 3: Validate each part and report errors
function validateURL(url) {
  if (!protocolPattern.test(url)) {
    throw new Error("Invalid protocol. Use http:// or https://.");
  }

  const domainStartIndex = url.indexOf("://") + 3;
  const domainEndIndex = url.indexOf("/", domainStartIndex);
  const domain = domainEndIndex === -1 ? 
        url.slice(domainStartIndex) :
        url.slice(domainStartIndex, domainEndIndex);

  if (!domainPattern.test(domain)) {
    throw new Error("Invalid domain name.");
  }

  const path = url.slice(domainEndIndex);
  if (path && !pathPattern.test(path)) {
    throw new Error("Invalid path.");
  }

  return true;
}

// Step 4: Add integration tests for the full URL validation
describe("Full URL Validation", () => {
  test("should pass for valid URLs", () => {
    expect(validateURL("https://lesluthiers.com/tour/")).toBe(true);
    expect(validateURL("https://bio.lesluthiers.org/")).toBe(true);
  });

  test("should fail for invalid URLs", () => {
    expect(() => validateURL("ftp://mastropiero.com")).
      toThrow("Invalid protocol");
    expect(() => validateURL("http://estherpsicore..com")).
      toThrow("Invalid domain name");
    expect(() => validateURL("http://book.warren-sanchez")).
      toThrow("Invalid path");
  });
});