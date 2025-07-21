import { useState, useEffect } from 'react';
import { Typography, Paper, Box, TextField, Button, Alert, Snackbar, CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import SendIcon from '@mui/icons-material/Send';

const RATE_LIMIT_MINUTES = 5;
const SERVICE_ID = 'default_service'; // Replace with your EmailJS service ID
const TEMPLATE_ID = 'template_default'; // Replace with your EmailJS template ID
const PUBLIC_KEY = 'your_public_key'; // Replace with your EmailJS public key

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success' as 'success' | 'error'
  });
  const [timeLeft, setTimeLeft] = useState<number | null>(null);

  useEffect(() => {
    const lastSubmitTime = localStorage.getItem('lastEmailSubmit');
    if (lastSubmitTime) {
      const timeDiff = Date.now() - parseInt(lastSubmitTime);
      const minutesLeft = RATE_LIMIT_MINUTES - Math.floor(timeDiff / (1000 * 60));
      if (minutesLeft > 0) {
        setTimeLeft(minutesLeft);
      }
    }
  }, []);

  useEffect(() => {
    let timer: number;
    if (timeLeft && timeLeft > 0) {
      timer = window.setInterval(() => {
        setTimeLeft(prev => prev ? prev - 1 : null);
      }, 60000); // Update every minute
    }
    return () => window.clearInterval(timer);
  }, [timeLeft]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setSnackbar({
        open: true,
        message: 'Please enter a valid email address',
        severity: 'error'
      });
      return;
    }

    // Check rate limiting
    const lastSubmitTime = localStorage.getItem('lastEmailSubmit');
    if (lastSubmitTime) {
      const timeDiff = Date.now() - parseInt(lastSubmitTime);
      const minutesLeft = RATE_LIMIT_MINUTES - Math.floor(timeDiff / (1000 * 60));
      if (minutesLeft > 0) {
        setSnackbar({
          open: true,
          message: `Please wait ${minutesLeft} minutes before sending another message`,
          severity: 'error'
        });
        return;
      }
    }

    try {
      setLoading(true);
      const templateParams = {
        to_email: 'tony.lilui@live.com',
        from_name: formData.name,
        from_email: formData.email,
        message: formData.message,
      };

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY);
      
      // Store submission time for rate limiting
      localStorage.setItem('lastEmailSubmit', Date.now().toString());
      setTimeLeft(RATE_LIMIT_MINUTES);
      
      setSnackbar({
        open: true,
        message: 'Message sent successfully! I\'ll get back to you soon.',
        severity: 'success'
      });
      
      // Reset form
      setFormData({ name: '', email: '', message: '' });
      
    } catch (error) {
      console.error('Email send error:', error);
      setSnackbar({
        open: true,
        message: 'Failed to send message. Please try again later.',
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Paper 
        component={motion.div}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ 
          p: 4,
          background: 'rgba(26, 32, 44, 0.4)',
          backdropFilter: 'blur(10px)',
          borderRadius: '24px',
          border: '1px solid rgba(74, 144, 226, 0.1)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <Typography 
          variant="h4" 
          gutterBottom
          sx={{ 
            background: 'linear-gradient(45deg, #4a90e2, #64b5f6)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontWeight: 'bold',
            mb: 3
          }}
        >
          Get in Touch
        </Typography>
        <Typography 
          variant="body1" 
          sx={{ 
            color: 'rgba(255, 255, 255, 0.8)',
            mb: 4 
          }}
        >
          Have a question or want to work together? Send me a message!
        </Typography>

        <Box 
          component="form" 
          onSubmit={handleSubmit}
          sx={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: 3
          }}
        >
          <TextField
            required
            fullWidth
            name="name"
            label="Your Name"
            value={formData.name}
            onChange={handleChange}
            disabled={loading || timeLeft !== null}
            sx={{
              '& .MuiOutlinedInput-root': {
                background: 'rgba(26, 32, 44, 0.4)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                color: 'rgba(255, 255, 255, 0.9)',
                transition: 'all 0.3s ease',
                '& fieldset': {
                  borderColor: 'rgba(74, 144, 226, 0.2)',
                  transition: 'all 0.3s ease',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(74, 144, 226, 0.4)',
                },
                '&.Mui-focused': {
                  boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)',
                  '& fieldset': {
                    borderColor: '#4a90e2',
                    borderWidth: '2px',
                  }
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(74, 144, 226, 0.8)',
                '&.Mui-focused': {
                  color: '#4a90e2',
                }
              }
            }}
          />
          <TextField
            required
            fullWidth
            name="email"
            type="email"
            label="Your Email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading || timeLeft !== null}
            sx={{
              '& .MuiOutlinedInput-root': {
                background: 'rgba(26, 32, 44, 0.4)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                color: 'rgba(255, 255, 255, 0.9)',
                transition: 'all 0.3s ease',
                '& fieldset': {
                  borderColor: 'rgba(74, 144, 226, 0.2)',
                  transition: 'all 0.3s ease',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(74, 144, 226, 0.4)',
                },
                '&.Mui-focused': {
                  boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)',
                  '& fieldset': {
                    borderColor: '#4a90e2',
                    borderWidth: '2px',
                  }
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(74, 144, 226, 0.8)',
                '&.Mui-focused': {
                  color: '#4a90e2',
                }
              }
            }}
          />
          <TextField
            required
            fullWidth
            multiline
            rows={4}
            name="message"
            label="Your Message"
            value={formData.message}
            onChange={handleChange}
            disabled={loading || timeLeft !== null}
            sx={{
              '& .MuiOutlinedInput-root': {
                background: 'rgba(26, 32, 44, 0.4)',
                backdropFilter: 'blur(10px)',
                borderRadius: '12px',
                color: 'rgba(255, 255, 255, 0.9)',
                transition: 'all 0.3s ease',
                '& fieldset': {
                  borderColor: 'rgba(74, 144, 226, 0.2)',
                  transition: 'all 0.3s ease',
                },
                '&:hover fieldset': {
                  borderColor: 'rgba(74, 144, 226, 0.4)',
                },
                '&.Mui-focused': {
                  boxShadow: '0 0 0 2px rgba(74, 144, 226, 0.2)',
                  '& fieldset': {
                    borderColor: '#4a90e2',
                    borderWidth: '2px',
                  }
                },
              },
              '& .MuiInputLabel-root': {
                color: 'rgba(74, 144, 226, 0.8)',
                '&.Mui-focused': {
                  color: '#4a90e2',
                }
              }
            }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              variant="contained"
              disabled={loading || timeLeft !== null}
              endIcon={loading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}
              sx={{
                background: 'linear-gradient(45deg, #4a90e2, #64b5f6)',
                borderRadius: '12px',
                px: 4,
                py: 1.5,
                textTransform: 'none',
                fontSize: '1rem',
                fontWeight: 500,
                boxShadow: '0 4px 15px rgba(74, 144, 226, 0.2)',
                transition: 'all 0.3s ease',
                '&:not(:disabled)': {
                  '&:hover': {
                    background: 'linear-gradient(45deg, #2170b0, #4a90e2)',
                    boxShadow: '0 6px 20px rgba(74, 144, 226, 0.3)',
                    transform: 'translateY(-1px)'
                  },
                  '&:active': {
                    transform: 'translateY(1px)'
                  }
                }
              }}
            >
              {loading ? 'Sending...' : timeLeft ? `Wait ${timeLeft}m` : 'Send Message'}
            </Button>
          </Box>
        </Box>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          <Alert
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Paper>
    </Box>
  );
}