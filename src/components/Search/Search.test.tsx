import { render, screen } from "@testing-library/react";
import Song from "../Song";

describe("Search", () => {
  test("MSW Spotify Search API", () => {
    render(
      <Song
        uri={""}
        image={""}
        title={""}
        album={""}
        selectState={function (uri: any): void {
          throw new Error("Function not implemented.");
        } }
        isSelected={false} artists={""} url={""} name={""} class={""}      />
    );
    const checkData = screen.findByText("Lover Boy");
    expect(checkData).toBeInTheDocument;
  });
});