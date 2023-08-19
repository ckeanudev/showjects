"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UserValidation } from "@/lib/validations/user";
import { ChangeEvent, useState, memo } from "react";
import { isBase64Image } from "@/lib/utils";
import { usePathname, useRouter } from "next/navigation";
import { useUploadThing } from "@/lib/uploadthing";
import { CgSpinner } from "react-icons/cg";

const CreateShowject = () => {
  return <section></section>;
};

export default CreateShowject;
