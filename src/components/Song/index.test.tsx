import { render, screen } from "@testing-library/react";
import Song from ".";

describe("Search", () => {
  test("MSW Spotify Search API", () => {
    render(
      <Song
        uri={""}
        url={""}
        name={""}
        class={""}
        image={""}
        title={""}
        album={""}
        artists={""}
        selectState={function (uri: string): void {
          throw new Error("Function not implemented.");
        }}
        isSelected={false}
      />
    );
    const checkData = screen.findByText("Lover Boy");
    expect(checkData).toBeInTheDocument;
  });
});