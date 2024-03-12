import React, { ReactElement, useState, useRef, useEffect } from "react";
import {
  Main,
  Top,
  Icon,
  Title,
  Message,
  Content,
  Footer,
  Button,
  Arrow,
  LoadingSpinner,
  PopoverContent,
} from "./styled";
import { IoMdInformationCircle } from "react-icons/io";
import { IoCloseCircle } from "react-icons/io5";
import { MdCheckCircle } from "react-icons/md";
import { AiOutlineLoading } from "react-icons/ai";

interface PopConfirmProps {
  title: string;
  content?: string;
  type?: "success" | "info" | "warn" | "error";
  icon?: JSX.Element;
  ok?: () => Promise<void>;
  children: ReactElement;
}

const PopConfirm: React.FC<PopConfirmProps> = ({
  title,
  content,
  type,
  icon,
  ok,
  children,
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [position, setPosition] = useState<"above" | "below">("below");
  const [loading, setLoading] = useState<boolean>(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const popConfirmRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      const { top } = buttonRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (windowHeight - top < 250) {
        setPosition("above");
      } else {
        setPosition("below");
      }
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (
        popConfirmRef.current &&
        !popConfirmRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [buttonRef]);

  const IconShow =
    type === "error" ? (
      <IoCloseCircle color="red" />
    ) : type === "info" ? (
      <IoMdInformationCircle color="#1677ff" />
    ) : type === "warn" ? (
      <IoMdInformationCircle color="#faad14" />
    ) : (
      <MdCheckCircle color="green" />
    );

  return (
    <>
      {open && (
        <PopoverContent ref={popConfirmRef} position={position}>
          <Main>
            <Top>
              <Icon> {icon ? icon : IconShow}</Icon>
              <Content>
                <Title> {title}</Title>
                <Message>{content}</Message>
              </Content>
            </Top>
            <Footer>
              <Button
                onClick={() => {
                  setLoading(false);
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button
                disabled={loading}
                bgcolor="#1677ff"
                onClick={async () => {
                  setLoading(true);
                  ok && (await ok());
                  setOpen(false);
                  setLoading(false);
                }}
              >
                {loading && (
                  <LoadingSpinner>
                    <AiOutlineLoading />
                  </LoadingSpinner>
                )}
                OK
              </Button>
            </Footer>
            <Arrow />
          </Main>
        </PopoverContent>
      )}
      {React.cloneElement(children, {
        ref: buttonRef,
        onClick: () => setOpen(!open),
        style: {
          cursor: "pointer",
          transition: "background-color 0.3s",
          ":hover": {
            backgroundColor: "#f0f0f0",
          },
        },
      })}
    </>
  );
};

export default PopConfirm;
