import { render, screen } from "@testing-library/react";

function TestCard({ title }) {
  return (
    <div data-testid="test-card" className="card p-3 shadow-sm">
      <h2>{title}</h2>
      <p>Sample frontend Jest test rendered successfully.</p>
    </div>
  );
}

describe("Frontend sample tests", () => {
  it("renders the sample test card with the correct text", () => {
    render(<TestCard title="Test Dashboard Card" />);

    expect(screen.getByTestId("test-card")).toBeInTheDocument();
    expect(screen.getByText("Test Dashboard Card")).toBeVisible();
    expect(screen.getByText("Sample frontend Jest test rendered successfully.")).toBeVisible();
  });
});
