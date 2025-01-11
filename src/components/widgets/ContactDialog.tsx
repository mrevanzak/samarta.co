import { z } from 'astro/zod';
import * as React from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { actions } from 'astro:actions';
import { navigate } from 'astro:transitions/client';
import { Button } from '@/components/ui/react/Button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/react/Dialog';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/react/Drawer';
import { Form, FormInput, useForm } from '@/components/ui/react/Form';

export default function ContactDialog(props: { title: string }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const title = 'Contact Us';
  const titleClassName = 'headline';

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button>{props.title}</Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl p-20">
          <DialogHeader>
            <DialogTitle className={titleClassName}>{title}</DialogTitle>
          </DialogHeader>
          <ContactUsForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>{props.title}</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle className={titleClassName}>{title}</DrawerTitle>
        </DrawerHeader>
        <ContactUsForm />
        <DrawerFooter className="p-0 pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ContactUsForm() {
  const contactSchema = z.object({
    name: z.string(),
    company: z.string(),
    email: z.string().email(),
    phone: z.string(),
    message: z.string(),
  });

  const methods = useForm({
    schema: contactSchema,
    mode: 'onSubmit',
  });
  const { handleSubmit, control } = methods;

  return (
    <Form {...methods}>
      <form
        className="space-y-4"
        onSubmit={handleSubmit(async (data) => {
          const { error } = await actions.contact(data);
          if (!error) {
            alert('Thank you for contacting us!');
            navigate('/');
          }
        })}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput control={control} name="name" />
          <FormInput control={control} name="company" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <FormInput control={control} name="email" />
          <FormInput control={control} name="phone" />
        </div>
        <div className="space-y-2">
          <FormInput as="textarea" control={control} name="message" />
        </div>
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
