import React, { useState } from "react";
import {
  Modal,
  IconButton,
  Box,
  Backdrop,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FullscreenIcon from "@mui/icons-material/Fullscreen";

const Certificate = ({ ImgSertif }) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box component="div" sx={{ width: "100%" }}>
      {/* Thumbnail Container */}
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          borderRadius: 2,
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",

          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: "0 12px 24px rgba(0,0,0,0.2)",

            "& .overlay": {
              opacity: 1,
            },

            "& .hover-content": {
              transform: "translate(-50%, -50%)",
              opacity: 1,
            },

            "& .certificate-image": {
              filter: "contrast(1.05) brightness(1) saturate(1.1)",
            },
          },
        }}
      >
        {/* Certificate Image */}
        <Box
          sx={{
            position: "relative",

            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              zIndex: 1,
              pointerEvents: "none",
            },
          }}
        >
          <img
            className="certificate-image"
            src={ImgSertif}
            alt="Certificate"
            style={{
              width: "100%",
              height: "auto",
              display: "block",
              objectFit: "cover",
              filter: "contrast(1.10) brightness(0.9) saturate(1.1)",
              transition: "filter 0.3s ease",
              cursor: "pointer",
            }}
            onClick={handleOpen}
          />
        </Box>

        {/* Hover Overlay */}
        <Box
          className="overlay"
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            transition: "all 0.3s ease",
            cursor: "pointer",
            zIndex: 2,
            backgroundColor: "rgba(0,0,0,0.25)",
          }}
          onClick={handleOpen}
        >
          {/* Hover Content */}
          <Box
            className="hover-content"
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -60%)",
              opacity: 0,
              transition: "all 0.4s ease",
              textAlign: "center",
              width: "100%",
              color: "white",
            }}
          >
            <FullscreenIcon
              sx={{
                fontSize: 40,
                mb: 1,
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            />

            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                textShadow: "0 2px 4px rgba(0,0,0,0.3)",
              }}
            >
              View Certificate
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="certificate-modal-title"
        aria-describedby="certificate-modal-description"
        closeAfterTransition
        slots={{
          backdrop: Backdrop,
        }}
        slotProps={{
          backdrop: {
            timeout: 300,
            sx: {
              backgroundColor: "rgba(0, 0, 0, 0.9)",
              backdropFilter: "blur(5px)",
            },
          },
        }}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: 0,
          padding: 0,

          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.9)",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            width: "auto",
            maxWidth: "90vw",
            maxHeight: "90vh",
            margin: 0,
            padding: 0,
            outline: "none",

            "&:focus": {
              outline: "none",
            },
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={handleClose}
            aria-label="Close certificate"
            sx={{
              position: "absolute",
              right: 16,
              top: 16,
              color: "white",
              backgroundColor: "rgba(0,0,0,0.6)",
              zIndex: 10,
              padding: 1,

              "&:hover": {
                backgroundColor: "rgba(0,0,0,0.8)",
                transform: "scale(1.1)",
              },

              transition: "all 0.2s ease",
            }}
            size="large"
          >
            <CloseIcon sx={{ fontSize: 24 }} />
          </IconButton>

          {/* Modal Image */}
          <img
            src={ImgSertif}
            alt="Certificate Full View"
            style={{
              display: "block",
              maxWidth: "90vw",
              maxHeight: "90vh",
              width: "auto",
              height: "auto",
              margin: "0 auto",
              objectFit: "contain",
            }}
          />
        </Box>
      </Modal>
    </Box>
  );
};

export default Certificate;