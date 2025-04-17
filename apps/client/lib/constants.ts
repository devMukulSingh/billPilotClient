import {Mail, Phone } from 'lucide-react'
import { FaLinkedin, FaTwitter } from "react-icons/fa";

export const BASE_URL_SERVER = process.env.NODE_ENV === 'production' ? `https://billmanagementserver.onrender.com/api/v1` : `http://localhost:8000/api/v1`

export const ITEM_INITIAL_VALUES = {
product:{
    id:"",
    rate:0,
    name:""
  },
  product_id: '',
  amount: 0,
  quantity: 1,
};

export const contactLinks = [
  {
    icon: Phone,
    value: '+91 9808273072',
  },
  {
    icon: Mail,
    value: 'mukulsingh2276@gmail.com',
  },

];

export const socialLinks = [
  {
    title:"LinkedIn",
    icon: FaLinkedin,
    value: 'https://linkedin.com/in/mukul-36a80428b',
  },
  {
    title:"X/Twitter",
    icon: FaTwitter,
    value: 'https://x.com/MukulSingh2276',
  },

];