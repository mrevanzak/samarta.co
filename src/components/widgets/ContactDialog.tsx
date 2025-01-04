import * as React from 'react';

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
import { Input } from '@/components/ui/react/Input';
import { Label } from '@/components/ui/react/Label';
import { useMediaQuery } from 'usehooks-ts';

export default function ContactDialog(props: { title: string }) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery('(min-width: 768px)');

  const title = 'Contact Us';
  const titleClassName = 'font-hero text-3xl md:text-5xl font-normal border-l-4 border-primary pl-6';

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
          <ProfileForm />
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
        <ProfileForm />
        <DrawerFooter className="p-0 pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ProfileForm() {
  return (
    <form className="space-y-4">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Name</Label>
          <Input placeholder="Name" />
        </div>
        <div className="space-y-2">
          <Label>Company</Label>
          <Input placeholder="Company" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label>Email Address</Label>
          <Input type="email" placeholder="Email Address" />
        </div>
        <div className="space-y-2">
          <Label>Phone</Label>
          <Input type="tel" placeholder="Phone" />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Message</Label>
      </div>
      <Button className="w-full">Submit</Button>
    </form>
  );
}
