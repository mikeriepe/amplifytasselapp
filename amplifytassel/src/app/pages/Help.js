import * as React from "react";
import MuiBox from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import Divider from "@mui/material/Divider";
import ThemedButton from "../components/Themed/ThemedButton";

const Page = styled((props) => <MuiBox {...props} />)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch", // Stretch children to fill available space
  gap: "1em",
  margin: "1em 2em", // Consistent margin
  width: "100%", // Use full width of the viewport
  boxSizing: "border-box", // Include padding and borders in width
  overflowX: "hidden", // Prevent any horizontal overflow
}));

const Text = ({ children }, props) => (
  <MuiBox
    sx={{
      display: "block", // Ensure block layout for proper wrapping
      marginLeft: "3em",
      marginRight: "3em",
      marginBottom: "1rem",
      lineHeight: 2,
      wordWrap: "break-word", // Wrap long words
      overflowWrap: "break-word",
      whiteSpace: "normal", // Allow wrapping at spaces
      maxWidth: "100%", // Constrain to parent's width
      boxSizing: "border-box", // Ensure padding and borders are considered
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

const Header = ({ children }, props) => (
  <MuiBox
    sx={{
      display: "flex",
      flexGrow: 1,
      flexDirection: "column",
      justifyContent: "left",
      marginLeft: "3em",
      marginTop: "1em",
      height: "100%",
      width: "calc(100% - 3em)",
      lineHeight: 1.5,
    }}
    {...props}
  >
    {children}
  </MuiBox>
);

/**
 * creates FAQ page
 * @return {HTML} FAQ page
 */
export default function Help() {
  const emails = "support@slugmatch.app";

  const sendEmail = () => {
    /**
     * @link https://developer.mozilla.org/en-US/docs/Learn/HTML/Introduction_to_HTML/Creating_hyperlinks#email_links
     * @link https://www.30secondsofcode.org/react/s/mailto/
     */
    const Mailto = ({ emails, subject = "", body = "" }) => {
      let params = subject || body ? "?" : "";
      if (subject) params += `subject=${encodeURIComponent(subject)}`;
      if (body)
        params += `${subject ? "&" : ""}body=${encodeURIComponent(body)}`;

      return `mailto:${emails}${params}`;
    };
    if (emails.length > 0) {
      window.open(Mailto({ emails }));
    }
  };

  const faqData = [
    {
      question: "How do I create an opportunity?",
      answer:
        "You can create an opportunity by going to the Opportunities page and selecting the 'Create New opportunity' button. This can also be done in the Dashboard by selecting the 'CREATE OPPORTUNITY' button in the Your Opportunities section.",
    },
    {
      question: "How do I apply for an opportunity?",
      answer:
        "Navigate to the Opportunities page and click the 'Apply' button on the desired opportunity. You can also apply from an opportunity's page. Write a message to express your interest (optional) and click 'Send Request to Join'.",
    },
    {
      question: "How do I accept/deny applicants for my opportunity?",
      answer:
        "Navigate to the opportunity page of your opportunity by selecting it from the 'Your Opportunities' section of the dashboard or the 'Created' tab of the Opportunities page. Select the 'Applicants' tab under the opportunity details to view all applicants and select the checkbox next to the user to accept/deny them.",
    },
  ];

  return (
    <Page>
      <Header>
        <h2 className="text-dark text-large" aria-label="Dashboard Header">
          Contact
        </h2>

        <Divider
          sx={{
            borderBottom: "0.5px solid rgba(0, 0, 0, 0.15)",
            marginRight: "3em",
            marginTop: "2em",
          }}
        />
      </Header>

      <Text>
        <h2 className="text-dark text-medium">
          Email us at: support@slugmatch.app
        </h2>
      </Text>

      <ThemedButton
        color={"blue"}
        variant={"themed"}
        type={"submit"}
        style={{
          fontSize: "0.875rem",
          width: "10rem",
          marginLeft: "3rem",
          marginBottom: "2rem",
        }}
        onClick={sendEmail}
      >
        Email SlugMatch
      </ThemedButton>

      <Header>
        <h2 className="text-dark text-large" aria-label="Dashboard Header">
          FAQ
        </h2>

        <Divider
          sx={{
            borderBottom: "0.5px solid rgba(0, 0, 0, 0.15)",
            marginRight: "3em",
            marginTop: "2em",
          }}
        />
      </Header>

      {faqData.map((faq, index) => (
        <Text key={index}>
          <h2
            className="text-dark text-medium"
            aria-label={`FAQ Question ${index + 1}`}
          >
            Q: {faq.question}
          </h2>
          <h5
            className="text-lightgray text-bold text-medium"
            aria-label={`FAQ Answer ${index + 1}`}
          >
            A: {faq.answer}
          </h5>
        </Text>
      ))}
    </Page>
  );
}
